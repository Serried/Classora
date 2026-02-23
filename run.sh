#!/bin/bash

echo "Installing Backend..."
cd backend
npm install

echo "Installing Frontend..."
cd ../frontend
npm install

echo "Starting Backend..."
cd ../backend
nodemon . &

sleep 3

echo "Starting Frontend..."
cd ../frontend
npm run dev &

wait