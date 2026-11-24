resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = var.www_subdomain ? ["www.${var.domain_name}"] : []
  validation_method         = "DNS"
  tags                      = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

# DNS lives in Cloudflare, not Route53 — Terraform can't create these
# records itself. Add them manually (see the cert_validation_records
# output), then re-run apply; this resource just polls ACM until it sees
# them and finishes on its own.
resource "aws_acm_certificate_validation" "site" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.site.arn
  validation_record_fqdns = [
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.resource_record_name
  ]
}
