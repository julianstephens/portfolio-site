module default {
  type Post {
    required property slug -> str;
    required property title -> str;
    required property date -> bigint;
    required property content -> str;
    property description -> str;
    multi property tag -> str;
  }
}
