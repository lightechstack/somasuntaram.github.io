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

aws dynamodb create-table \
  --table-name <your-tf-lock-table> \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

Then fill in the `backend "s3"` block in `versions.tf` and run
`terraform init`.

**Option B — a separate `bootstrap/` Terraform root with `local` backend**
that provisions the state bucket + lock table, then you `terraform state mv`
nothing (there's nothing to move) and just point the main stack at it. More
"correct" for a team, overkill for one portfolio site — worth stating that
tradeoff explicitly if this comes up in an interview, since "always use
Terraform for everything" is the naive answer and the honest answer is
"state storage is the one thing that has to be created out-of-band."

This repo uses Option A. If you want the case study to demonstrate Option B
instead, say so before writing the write-up — don't silently switch later.
