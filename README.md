# SYS.ARJUN_AKKENA // Enterprise Architecture

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Welcome to the command center of **Arjun Vardhan Russo Akkena**. 

This repository houses my professional portfolio. Unlike a standard static website, this is a fully functional **Java Spring Boot Application** that interacts with a PostgreSQL database, all containerized for immediate deployment using Docker.

## The Architecture
1. **Frontend**: A custom-built, framework-less UI utilizing advanced HTML5 Canvas APIs for an interactive neural network, and mathematics-driven 3D CSS tilts.
2. **Backend**: A robust Java 17 Spring Boot REST API (`/api/orders`) designed to handle "Procurement Requests" (e.g., job inquiries or deployment requests).
3. **Database**: PostgreSQL handles ACID-compliant persistence, seamlessly managed by Spring Data JPA and Hibernate.
4. **DevOps**: A multi-stage Maven Dockerfile compiles the application securely inside the container environment. Docker Compose orchestrates the networking between the backend, the database, and caching layers.

## One-Click Deployment (Using Docker)

If you have Docker Desktop installed, you can spin up this entire architecture (Database + Backend + Frontend) in one command without needing to install Maven or Java on your host machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Hyperion.git
   cd Hyperion
   ```

2. **Initialize the Docker containers:**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the Application:**
   Docker will build the Java `.jar`, start Postgres, and wire them together automatically.
   Once running, open your browser and navigate to:
   
   **[http://localhost:8080](http://localhost:8080)**

## Modules Included

- **ERP Integration Engine**: Scalable REST APIs using JWT security.
- **Financial Fraud Detection**: Imbalanced data pipelines utilizing Python, XGBoost, and SMOTE class-weighting.
- **Quantum Teleportation Subroutines**: Ground-up implementations of IBM Qiskit protocols to validate qubit transmission fidelities.

---
*© 2026 Arjun Vardhan Russo Akkena. Built for the future.*
