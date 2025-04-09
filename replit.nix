{ pkgs }:

with pkgs; {
  deps = [
    go_1_19
    # include any other system-level dependencies here
  ];
}