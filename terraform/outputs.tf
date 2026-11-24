output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "site_url" {
  value = "https://${var.domain_name}"
}

# Add these as CNAME records in Cloudflare before the first apply can finish —
# aws_acm_certificate_validation blocks on ACM seeing them. DNS-only (grey
# cloud), not proxied, or ACM's validation check can fail against Cloudflare's edge.
output "cert_validation_records" {
  description = "DNS records to create in Cloudflare for ACM certificate validation"
  value = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      type  = dvo.resource_record_type
      name  = dvo.resource_record_name
      value = dvo.resource_record_value
    }
  }
}

# Add after the distribution exists: apex + www as CNAME to this value
# (Cloudflare flattens CNAME-at-root automatically, DNS-only so ACM/CloudFront
# see the real chain, not Cloudflare's proxy).
output "cloudfront_alias_target" {
  description = "Target for apex/www CNAME records in Cloudflare"
  value       = aws_cloudfront_distribution.site.domain_name
}
