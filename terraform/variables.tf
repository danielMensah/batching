variable "region" {
  description = "AWS Region to deploy to"
  type = string
  default = "eu-west-2"
}

variable "users_table_name" {
  description = "Name of dynamo db table for users"
  type = string
  default = "users"
}

variable "environment" {
  description = "Infrastructure environment"
  type = string
  default = "dev"
}
