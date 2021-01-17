provider "aws" {
  profile = "default"
  version = "~> 3.0"
  region  = var.region
}

data "aws_caller_identity" "current" {}

resource "aws_dynamodb_table" "batching-users" {
  name         = var.users_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  range_key    = ""

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "first_name"
    type = "S"
  }

  attribute {
    name = "last_name"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "id_index"
    hash_key        = "id"
    range_key       = ""
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "first_name_index"
    hash_key        = "first_name"
    range_key       = ""
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "last_name__index"
    hash_key        = "last_name"
    range_key       = ""
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "email_index"
    hash_key        = "email"
    range_key       = ""
    projection_type = "ALL"
  }

}

resource "aws_sqs_queue" "bullhorn_sync_queue_deadletter" {
  name = "bullhorn_sync_queue_deadletter"
  max_message_size = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
}

resource "aws_sqs_queue" "terraform_queue" {
  name                      = "bullhorn"
  max_message_size          = 2048
  receive_wait_time_seconds = 10
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.bullhorn_sync_queue_deadletter.arn
    maxReceiveCount     = 4
  })

  tags = {
    Environment = var.environment
  }
}
