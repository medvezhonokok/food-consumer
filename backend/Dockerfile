FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

RUN apt-get update && apt-get install -y maven

# Copy only the POM file
COPY ./pom.xml /app/

# Download Maven dependencies (caching if POM file hasn't changed)
RUN mvn dependency:go-offline

# Copy the rest of the project files
COPY . /app/

# Compile and run the application
RUN mvn clean compile

EXPOSE 8080

ENTRYPOINT mvn exec:java -Dspring-boot.run.profiles=docker
