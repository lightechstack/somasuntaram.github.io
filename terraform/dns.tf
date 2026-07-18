# Create the zone only if an existing hosted_zone_id wasn't supplied.
resource "aws_route53_zone" "this" {
  count = var.hosted_zone_id == null ? 1 : 0
  name  = var.domain_name
  tags  = var.tags
}

locals {
  zone_id = var.hosted_zone_id != null ? var.hosted_zone_id : aws_route53_zone.this[0].zone_id
}

resource "aws_route53_record" "apex" {
  zone_id = local.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  count   = var.www_subdomain ? 1 : 0
  zone_id = local.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
