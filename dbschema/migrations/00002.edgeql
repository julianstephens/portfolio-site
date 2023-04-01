CREATE MIGRATION m1t3l5n2ubhx7wqibh77ybyjguxekghs7fh45vokc2wo2zigxnrrqa
    ONTO m1tjpklxrleksp3x3oi3zkgcc3eydni4j5enddgt4hmea5il3whfcq
{
  ALTER TYPE default::Post {
      CREATE REQUIRED PROPERTY slug -> std::str {
          SET REQUIRED USING ('blah');
      };
  };
};
