# Production-Ready CI/CD Pipeline for a Dockerized Web Application

A production-style DevOps project that demonstrates automated CI/CD, containerized deployment, reverse proxying, cloud infrastructure, monitoring, and alerting using AWS, Docker, GitHub Actions, Prometheus, Grafana, and Alertmanager.

## 🚀 Project Overview

This project implements an end-to-end deployment and monitoring pipeline for a Node.js web application.

The application is containerized using Docker, deployed on an AWS EC2 instance, served through an Nginx reverse proxy, and monitored using Prometheus, Node Exporter, and Grafana.

Prometheus alert rules are integrated with Alertmanager to provide email notifications when infrastructure problems are detected.

## 🏗️ Architecture

```text
                    GitHub Repository
                           │
                           ▼
                    GitHub Actions
                           │
                    Build & Test
                           │
                           ▼
                       Docker
                           │
                           ▼
                      AWS EC2
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
             Nginx              Monitoring Stack
                │                     │
                ▼              ┌──────┴──────┐
          Node.js App          │             │
                               ▼             ▼
                           Prometheus     Grafana
                               │
                               ▼
                         Alertmanager
                               │
                               ▼
                          Email Alerts
