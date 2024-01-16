import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

// ยังมีปัญหา //

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  const collection = db.collection("question");
  const question = await collection.find({}).limit(10).toArray();
  return res.json({ data: question });
});

questionRouter.get("/", async (req, res) => {
  const collection = db.collection("question");
  const question = await collection.find({ question: Id }).limit(10).toArray();
  return res.json({ data: question });
});

questionRouter.post("/", async (req, res) => {
  const collection = db.collection("question");
  const questionData = { ...req.body };
  const question = await collection.insertOne(questionData);

  return res.json({
    message: `New post (${question.insertedId}) has been created successfully`,
  });
});

questionRouter.put("/:questionId", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `question`
  const collection = db.collection("question");

  // 3) Update ข้อมูลใน Database โดยใช้ `collection.updateOne(query)` โดยการ
  // นำ questionId จาก Endpoint parameter มา Assign ลงใน Variable `movieId`
  // โดยที่ใช้ ObjectId ที่ Import มาจากด้านบน ในการ Convert Type ด้วย
  const questionId = ObjectId(req.params.questionId);
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `newMovieData`
  const newQuestionData = { ...req.body };

  await collection.updateOne(
    {
      _id: questionId,
    },
    {
      $set: newQuestionData,
    }
  );

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: `Post (${questionId}) has been updated successfully`,
  });
});

questionRouter.delete("/question/:questionId", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `question`
  const collection = db.collection("question");

  // 3) Delete ข้อมูลออกจากใน Database โดยใช้ `collection.deleteOne(query)`
  // นำ movieId จาก Endpoint parameter มา Assign ลงใน Variable `movieId`
  const questionId = ObjectId(req.params.questionId);

  await collection.deleteOne({
    _id: questionId,
  });

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: `Post (${questionId}) has been deleted successfully`,
  });
});

export default questionRouter;
