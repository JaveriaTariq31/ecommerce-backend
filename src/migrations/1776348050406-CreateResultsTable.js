export class CreateResultsTable1774494390541 {
  name = "CreateResultsTable1774494390541";

  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE "results" (
        "id" SERIAL NOT NULL,
        "student_name" character varying NOT NULL,
        "subject" character varying NOT NULL,
        "marks" integer NOT NULL,
        "grade" character varying,
        CONSTRAINT "PK_e8f2a9191c61c15b627c117a678" PRIMARY KEY ("id")
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "results"`);
  }
}