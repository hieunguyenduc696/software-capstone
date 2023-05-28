const axios = require("axios");
const { testId, invalidTestId } = require("./sc.fixture.ts");

test("Create test success with status 201", async () => {
  const createTest = () =>
    axios.post("http://localhost:8090/reading-skill/admin/test/create", {
      data: [
        {
          title: "TEST1",
          test_type: 0,
          test_level: 0,
          sections: [
            {
              section_index: 1,
              section_type: 0,
              paragraph: {
                wallpaper: "image_url",
                title: "paragraph title",
                content: "paragraph content",
              },
              templates: [
                {
                  template_type_id: 0,
                  template_index: 1,
                  title: "TEST template title",
                  content: "TEST content",
                  expand_clumn: null,
                  questions: [
                    {
                      question_index: 1,
                      content: "Test question",
                      options: "{'test': 'hehehehe'}",
                      score: 1,
                      answers: [
                        {
                          content: "this is the answers",
                          options: "{'some_options': 'hehehe'}",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              section_index: 2,
              section_type: 0,
              paragraph: {
                wallpaper: "image_url",
                title: "paragraph title",
                content: "paragraph content",
              },
              templates: [
                {
                  template_type_id: 0,
                  template_index: 1,
                  title: "TEST template title",
                  content: "TEST content",
                  expand_clumn: null,
                  questions: [
                    {
                      question_index: 1,
                      content: "Test question",
                      options: "{'test': 'hehehehe'}",
                      score: 1,
                      answers: [
                        {
                          content: "this is the answers",
                          options: "{'some_options': 'hehehe'}",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  const res = await createTest();
  expect(res.status).toEqual(201);
  expect(typeof res.data.data[0].createTestId).toBe("number");
});

test("Get test successfully with status code 200 and test id", async () => {
  const getTestById = (id: number) =>
    axios.get(`http://localhost:8090/reading-skill/admin/test/${id}`);

  const res = await getTestById(testId);

  expect(res.status).toEqual(200);
  expect(res.data.data.test_id).toBe(testId);
});

test("Get test fail with status code 404", async () => {
  const getTestById = (id: number) =>
    axios.get(`http://localhost:8090/reading-skill/admin/test/${id}`);

  try {
    await getTestById(invalidTestId);
  } catch (error: any) {
    expect(error.response.status).toEqual(404);
  }
});
