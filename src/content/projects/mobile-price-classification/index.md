---
title: "Mobile Price Classifier"
description: "Mobile Price Classification using Random Forests."
date: "08/05/2023"
demoURL: "/project/mobile-price-classification"
repoURL: "https://github.com/pshkrh/mobile-price-classification"
---

## Mobile Price Classification

A simple mobile price classifier trained using Amazon SageMaker, hosted on AWS Lambda.

### Installation

```
pip install -r requirements.txt
```

### Usage

Replace the values in `env-vars.yml` with the actual values from your AWS account.

The `sagemaker-profile` is the name of the profile used in AWS CLI with all the relevant permissions.

Run all the cells in the Jupyter Notebook.

Don't forget to delete the endpoint once you are done with it!