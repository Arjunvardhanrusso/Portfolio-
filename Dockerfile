# ==========================================
# STAGE 1: Build the Application utilizing Maven
# ==========================================
FROM maven:3.9.5-eclipse-temurin-17-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and dependency instructions
COPY pom.xml .

# Download dependencies (this caches them so future builds are faster unless pom changes)
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Compile and package the application into a .jar file, skipping tests for speed
RUN mvn clean package -DskipTests

# ==========================================
# STAGE 2: Create the Lightweight Runtime Image
# ==========================================
FROM eclipse-temurin:17-jre-alpine

# Set the working directory
WORKDIR /app

# Copy ONLY the compiled .jar file from the builder stage
# This keeps the final image very small and secure
COPY --from=builder /app/target/*.jar app.jar

# Expose port 8080 to external traffic
EXPOSE 8080

# Run the Java application
ENTRYPOINT ["java", "-jar", "app.jar"]
