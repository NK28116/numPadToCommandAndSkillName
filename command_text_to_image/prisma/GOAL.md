
コマンドDB

|id | タイトル| キャラ| テンキー入力| 技名 |コマンド画像| 上中下段|

```prisma
model StreetFighter6{
ID            int  @id @default(autoincrement())
CharacterName string 
numPadInput string
SkillName string @unique
commandImagePath string
HitParts  hitPartEnum
}

model Tekken8{

}

model GGST{

}

enum hitPartEnum{
High
Middle
Low
}
```