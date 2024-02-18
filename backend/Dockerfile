FROM eclipse-temurin:17-jdk-jammy

RUN mkdir /app
RUN apt-get update && apt-get install -y maven

COPY . /app
RUN cd /app
WORKDIR /app

EXPOSE 8080

ENTRYPOINT mvn clean compile exec:java -Dspring-boot.run.profiles=docker