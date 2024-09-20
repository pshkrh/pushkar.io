---
title: "Food Image Classifier"
description: "Classify food images from 101 categories."
date: "12/13/2023"
demoURL: ""
repoURL: "https://github.com/pshkrh/food-clf-gen"
---

## Food Image Classification with CNNs

### Installation

The following packages are required:

- PyTorch
- Pandas
- scikit-learn
- matplotlib
- tqdm
- numpy
- kaggle

For PyTorch, please follow the instructions here (for pip or conda): https://pytorch.org/get-started/locally/

```shell
pip install numpy pandas matplotlib scikit-learn tqdm kaggle torch torchvision torchaudio
```

### Downloading the dataset

There are a few ways to obtain the Food-101 dataset. One is from the author's website [here](https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/).
Another option is to download it from Kaggle [here](https://www.kaggle.com/datasets/dansbecker/food-101).

Alternatively, if you decide to run the Notebook, it already contains code to download the zip from either the dataset website or from kaggle. For the kaggle option via the Notebook, you will need a kaggle.json file in the same directory as the notebook. More info [here](https://www.kaggle.com/discussions/general/156610).

### Usage

The repository contains both Jupyter notebooks and Python scripts. The Jupyter notebooks have commands to execute any additional libraries that may be required for installation.
Included is also the experiment code that was run for training the Food-11 dataset as well in ```food11-training.ipynb```. All the notebooks can also be run in Google Colab as-is.


The python scripts have the same code as the notebooks, just more cleaned up and better organized. You will get the same results regardless of which option you use.

#### Training and Evaluation

This script will execute the entire training pipeline for all 5 models, both pretrained and non-pretrained. Two CSV files and pickle files will be saved at the end with the results on the test set and model metrics respectively. All the trained models will be stored in the ```Trained_Models``` folder in the same directory as the script.

```shell
python train_classifier.py
```

#### Inference

You will need to set the input image path in the ```main()``` function. The script will print out the predicted class.

```shell
python predict_image.py
```

#### Plotting

The jupyter notebook ```plots.ipynb``` contains the plotting code to generate plots for training and testing loss and accuracy for both pretrained and non-pretrained models.
You will need to specify the path to the pickle files for the pretrained and non-pretrained model metrics in order to generate the figures.

You can download the pickle files obtained from the training experiment here: https://drive.google.com/file/d/1cp-0ytNgz7hh4NbRV1jCWYsJ46QIf9YE/view?usp=sharing