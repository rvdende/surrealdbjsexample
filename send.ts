import fs from "fs";

async function run() {
  const data = await fs.promises.readFile("./data.json");

  const parsed = JSON.parse(data.toString());

  const initresult = await fetch("http://localhost:8000/sql", {
    method: "post",
    headers: {
      accept: "application/json",
      Authorization: "Basic " + btoa("root:root"),
    },
    body: "DEFINE NS test; USE NS test; DEFINE DB testdb; USE NS test DB testdb;",
  }).then((r) => r.json());

  console.log(initresult);

  for (const a of parsed) {
    console.log(a);

    const sendresult = await fetch("http://localhost:8000/sql", {
      method: "post",
      headers: {
        accept: "application/json",
        Authorization: "Basic " + btoa("root:root"),
      },
      body: `USE NS test DB testdb; CREATE testdata CONTENT ${JSON.stringify(
        a
      )}`,
    }).then((r) => r.json());
  }
}

run();
