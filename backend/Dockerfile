FROM eclipse-temurin:17-jdk-jammy

ADD target/docker-backend.jar docker-backend.jar
ENTRYPOINT ["java", "-jar","docker-backend.jar"]
EXPOSE 8080
