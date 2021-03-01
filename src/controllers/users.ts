import * as crypto from "crypto";
import * as knex from "knex";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserModel } from "../models/user";

export default async function users(fastify: FastifyInstance) {
  const userModel = new UserModel();
  const db: knex = fastify.knex;

  fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body;
    const { username, password, firstname, lastname, birthDate } = body;
    try {
      const encryptPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      const data: any = {};

      data.username = username;
      data.password = encryptPassword;
      data.firstname = firstname;
      data.lastname = lastname;
      data.birthDate = birthDate;

      await userModel.create(db, data);
      reply.send({ ok: true });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ ok: false, message: error.message });
    }
  });
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const rs: any = await userModel.read(db);
      reply.send(rs);
    } catch (error) {
      console.log(error);
      reply.code(500).send({ ok: false, error: error.message });
    }
  });

  fastify.get(
    "/search",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const query: any = request.query;
        const q = query.q;
        const rs: any = await userModel.search(db, q);
        reply.send(rs);
      } catch (error) {
        console.log(error);
        reply.code(500).send({ ok: false, error: error.message });
      }
    }
  );

  fastify.patch(
    "/:userId/edit",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body: any = request.body;
      const { password, firstname, lastname } = body;
      const params: any = request.params
        const userId = params.userId
      try {
        const data: any = {};

        data.firstname = firstname;
        data.lastname = lastname;

        
        if (password) {
          const encryptPassword = crypto
            .createHash("md5")
            .update(password)
            .digest("hex");
          data.password = encryptPassword;
        }
        await userModel.update(db, userId,data);
        reply.send({ ok: true });
      } catch (error) {
        console.log(error);
        reply.code(500).send({ ok: false, message: error.message });
      }
    }
  );
}
