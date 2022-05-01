import { Arg, InputType, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import fs from "fs";

@Resolver()
export class ProfilePictureResolver {
  @Mutation((_) => Boolean)
  async addProfilePicture(
    @Arg("picture", (_) => GraphQLUpload) upload: FileUpload
  ) {
    console.log("음. 사진 업로딩 요청이네요?! : ", upload);
    return new Promise((res, rej) => {
      upload
        .createReadStream()
        .pipe(fs.createWriteStream(`images/${upload.filename}`))
        // .on("drain", () => console.log("drain."))
        .on("finish", () => res(true))
        .on("error", (_) => rej(false));
    });
  }
}

/*
curl 'http://localhost:4000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation AddProfilePicture($picture: Upload!) {\n  addProfilePicture(picture: $picture)\n}"}' --compressed
*/
