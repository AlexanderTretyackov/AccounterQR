package ru.psu.accounterqr.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.psu.accounterqr.entity.ObjectEntity;

@Repository
public interface ObjectRepository extends MongoRepository<ObjectEntity, String> {

    ObjectEntity getObjectEntitiesById(String id);

}
