function callexp(..._args: any[]) {}
function call2(..._args: any[]]) {}
let ident1, ident2, ident3, ident4, ident5, ident6 = { lol: { kek: 1 }};
switch (callexp(ident1, ident2, call2(ident3, ident4), typeof ident5, ident6.lol.kek)) {}