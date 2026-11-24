# Bootstrap: state backend

Terraform's S3 backend can't create its own bucket — you need the state
storage to exist before you can point Terraform at it. Two options, pick one
and be able to explain the tradeoff if asked:

**Option A — one-time manual/CLI bootstrap (recommended for a single-stack
portfolio):**

```bash
aws s3api create-bucket \
  --bucket <your-tf-state-bucket> \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

aws s3api put-bucket-versioning \
  --bucket <your-tf-state-bucket> \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket <your-tf-state-bucket> \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

aws s3api put-public-access-block \
  --bucket <your-tf-state-bucket> \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

aws s3api put-bucket-ownership-controls \
  --bucket <your-tf-state-bucket> \
  --ownership-controls '{"Rules":[{"ObjectOwnership":"BucketOwnerEnforced"}]}'

# Reject plain-HTTP access to state (may contain resource ARNs/config —
# not secrets by design, but still shouldn't cross the wire unencrypted).
aws s3api put-bucket-policy \
  --bucket <your-tf-state-bucket> \
  --policy '{"Version":"2012-10-17","Statement":[{"Sid":"DenyInsecureTransport","Effect":"Deny","Principal":"*","Action":"s3:*","Resource":["arn:aws:s3:::<your-tf-state-bucket>","arn:aws:s3:::<your-tf-state-bucket>/*"],"Condition":{"Bool":{"aws:SecureTransport":"false"}}}]}'
```

This mirrors the same baseline (encryption, no public access, no ACLs,
TLS-only) the `site` bucket gets from Terraform in `s3.tf` — state storage
doesn't get a lower bar just because it's created out-of-band.

No DynamoDB lock table needed — Terraform >= 1.10 supports native S3
locking (`use_lockfile = true` in the `backend "s3"` block) via conditional
writes against the state bucket itself, replacing the old DynamoDB-table
pattern. One less resource to create, pay for, or forget to tear down.

Then fill in the `backend "s3"` block in `versions.tf` and run
`terraform init`.

**Option B — a separate `bootstrap/` Terraform root with `local` backend**
that provisions the state bucket, then you `terraform state mv`
nothing (there's nothing to move) and just point the main stack at it. More
"correct" for a team, overkill for one portfolio site — worth stating that
tradeoff explicitly if this comes up in an interview, since "always use
Terraform for everything" is the naive answer and the honest answer is
"state storage is the one thing that has to be created out-of-band."

This repo uses Option A. If you want the case study to demonstrate Option B
instead, say so before writing the write-up — don't silently switch later.
