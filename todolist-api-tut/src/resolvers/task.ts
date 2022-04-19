import { Task } from "../entities/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World";
  }
  @Query(() => [Task])
  async tasks() {
    const tasks = await Task.find({}); // find all
    return tasks;
  }

  @Query(() => Task, { nullable: true })
  async task(@Arg("id", () => Int) id: number) {
    return await Task.findOne({ where: { id } });
  }

  @Mutation(() => Task)
  async createTask(
    @Arg("title", () => String)
    title: string
  ) {
    const createdTask = await Task.create({ title, isComplete: false });
    await createdTask.save();
    return createdTask;
  }

  @Mutation(() => Task, { nullable: true })
  async updateTaskStatus(
    @Arg("id", () => Int)
    id: number,
    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ) {
    const result = await Task.update({ id }, { isComplete });
    if (result.affected) {
      return Task.findOne({ where: { id } });
    }
    return null;
  }

  @Mutation(() => Task, { nullable: true })
  async deleteTask(@Arg("id", () => Int) id: number) {
    const task = await this.task(id);
    if (task) {
      await Task.delete({ id });
    }
    return task;
  }
}
