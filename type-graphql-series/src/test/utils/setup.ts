import {testDataSource} from "./testConnection";

// node 가 가끔 async 작업이 종료된 다음 process가 끝이 안나는 경우가 있어서
// 이렇게 하는거라고 함.
// (async () => {
//   try {
//     const ds = testDataSource(true);
//   } catch(e) {
//     console.log("error : ", e);
//   }
// })().then(() => process.exit());
testDataSource(true).then(() => {
  console.log("done");
  process.exit();
})




