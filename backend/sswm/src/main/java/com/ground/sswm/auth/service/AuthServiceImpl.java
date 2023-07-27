spring:
  profiles:
    group:
      production-set1:
      production-set2:

---

spring:
  config:
    activate:
      on-profile: production-set1
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: create

    properties:
      hibernate:
        format_sql: true
        show_sql: true
    servlet:
      multipart:  # 파일 올리는 설정
        max-file-size: 5MB # 요청한 파일 한 개의 크기
        max-request-size: 5MB # 요청한 파일 전체의 크기
  redis:
    host: localhost
    port: 6379

# S3 사용 설정
cloud:
  aws:
    credentials:
      accessKey: AKIAZPPUJPXAEPPKBU4Z       # AWS IAM AccessKey 적기
      secretKey: 3Kgaf4A2pddtxT6bfH8Nr8pcsCT5OsoOjfQt/E/w   # AWS IAM SecretKey 적기
    s3:
      bucket: sswm-image    # ex) marryting-gyunny
    #      dir: /image # ex) /gyunny
    region:
      static: ap-northeast-2
    stack:
      auto: false

logging:
  level:
    com.ground.sswm : DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE

---
spring:
  config:
    activate:
      on-profile: production-set2
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: create

    properties:
      hibernate:
        format_sql: true
        show_sql: true
    servlet:
      multipart:  # 파일 올리는 설정
        max-file-size: 5MB # 요청한 파일 한 개의 크기
        max-request-size: 5MB # 요청한 파일 전체의 크기
  redis:
    host: localhost
    port: 6379

# S3 사용 설정
cloud:
  aws:
    credentials:
      accessKey: AKIAZPPUJPXAEPPKBU4Z       # AWS IAM AccessKey 적기
      secretKey: 3Kgaf4A2pddtxT6bfH8Nr8pcsCT5OsoOjfQt/E/w   # AWS IAM SecretKey 적기
    s3:
      bucket: sswm-image    # ex) marryting-gyunny
    #      dir: /image # ex) /gyunny
    region:
      static: ap-northeast-2
    stack:
      auto: false

logging:
  level:
    com.ground.sswm : DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE

---
spring:
  config:
    activate:
      on-profile: production_set1
  datasource:
    url: jdbc:mysql://localhost:3306/sswm
    username: root
    password: root

---
spring:
  config:
    activate:
      on-profile: production_set2
  datasource:
    url: jdbc:mysql://localhost:3306/sswm
    username: root
    password: root

---

spring:
  config:
    activate:
      on-profile: production_set1

server:
  servlet:
    context-path: /api
  port: 9001

---

spring:
  config:
    activate:
      on-profile: production_set2

server:
  servlet:
    context-path: /api
  port: 9002

