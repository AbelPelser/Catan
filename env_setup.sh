#!/bin/bash

virtualenv vvenv -p python3;
. vvenv/bin/activate;
pip3 install -r requirements.txt;
