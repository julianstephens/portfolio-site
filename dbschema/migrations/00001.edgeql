CREATE MIGRATION m1tjpklxrleksp3x3oi3zkgcc3eydni4j5enddgt4hmea5il3whfcq
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Post {
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE REQUIRED PROPERTY date -> std::bigint;
      CREATE PROPERTY description -> std::str;
      CREATE MULTI PROPERTY tag -> std::str;
      CREATE REQUIRED PROPERTY title -> std::str;
  };
};
