
```
Docker-Compose
└── docker-mysql
    ├── docker-compose.yml
    └── mysql
        ├── DB
        │   └── world.sql
        ├── Dockerfile
        └── my.cnf

src
├── app
|    ├── api
|    |    ├── country
|    |    |    ├── [continent].ts
|    |    |    ├── [slug]
|    |    |    |    └── route.ts
|    |    |    └── route.ts
|    |    └── search
|    |        └── route.ts
|    ├── components
|    |    ├── CommandForm.tsx
|    |    ├── CommandInput.tsx
|    |    ├── SkillName.tsx
|    |    └── Search.tsx
|    ├── favicon.ico
|    ├── globals.css
|    ├── layout.tsx
|    ├── page.tsx
|    ├── searchData
|    |    ├── [continent]
|    |    |    └── page.tsx
|    |    └── page.tsx
|    ├── template.tsx
|    ├── uploadCSV
|    |    └── uploadTest.csv
|    └── util
|      ├── connectImageArray.tsx
|      └── imageUtl.tsx
└── lib
     └── prismaClient.ts
     
pages

prisma
├── migrations
│   ├── 20240624011720_add_unique_constraint_to_name
│   │   └── migration.sql
│   ├── 20240702084622_
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma

public

     
```

