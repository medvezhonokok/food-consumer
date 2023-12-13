package ru.backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = "SELECT * from User WHERE handle=?1 and passwordSha=SHA1(CONCAT('abfb33e9f6ccc', ?1, ?2))",
            nativeQuery = true
    )
    User findByHandleAndPassword(String handle, String password);

    @Query(
            value = "UPDATE User SET passwordSha=SHA1(CONCAT('abfb33e9f6ccc', ?2, ?3)) WHERE userId=?1",
            nativeQuery = true
    )
    void updatePassword(long userId, String login, String password);
}
