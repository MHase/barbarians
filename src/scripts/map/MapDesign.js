function MapDesign() {}

/*
MAP CREATOR ICON ANNOTATION

Obstacles:
x = lonely mountain
I = start (Left) of horizontal mountain range
X = mountain range center
D = end (Right) of horizontal mountain range
V = vegetation

' ' = empty cell

Units:
N = neutral town
A = roman town
E = barbarian town
n = neutral creature (wolfs)
a = roman soldier
e = barbarian soldier


OTHERS (NOT IMPLEMENTED YET)

'-' = road
'S' = river
'=' = bridge
'[' = wall

*/
MapDesign.prototype.blueprints = [
    // 0. Blank template
    [
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        "
    ],

    // 1. Fair start
    [
        "ID n  ID",
        "xA    Nx",
        "x     ID",
        "  aID   ",
        "    xe  ",
        "ID     x",
        "xN    Ex",
        "IXD  nID"
    ],

    // 2. Surrounded my mountains (easy)
    [
        "ID IXXXD",
        "x IXXD x",
        "ID AN ID",
        "ID a aID",
        "IDe e ID",
        "ID eE ID",
        "xE ID  x",
        "IXXXDeID"
    ],

    // 3. Conquer fast
    [
        "IXD AIXD",
        "x aaaa x",
        "x      x",
        "x      x",
        "x   N  x",
        "xe E  ex",
        "x ee e x",
        "IXXDeIXD"
    ],

    // 4. Snake mountains (hard and long)
    [
        "ID IXXXD",
        "xAa    x",
        "IXXXDN x",
        "xNn    x",
        "x    nNx",
        "x EIXXXD",
        "x     Ex",
        "IXXXXXXD"
    ],

    // 5. Surrounded by foes
    [
        "xeee VID",
        "V e e eV",
        " e    e ",
        " V AA  n",
        "   aa   ",
        " e    e ",
        " ee  e n",
        "n Ve eeV"
    ],

    // 6. Unfair match
    [
        "IXXXXXXD",
        "x E V   ",
        "x  eV Ax",
        "x E N ax",
        "x  e  ax",
        "x E V Ax",
        "x e V   ",
        "IXXXXXXD"
    ],

    // 7. Wolves!
    [
        "V     AV",
        "  VE   V",
        "       n",
        "n n   V ",
        " nVVVNnn",
        "       n",
        "N a     ",
        "VVV VE V"
    ],

    // 8. Surrounded by mountains and foes (hard)
    [
        "IXDN IXD",
        "ID   e x",
        "x  A  Ex",
        "xaIXD ID",
        "x x   Ex",
        "x x N  x",
        "xe ex Ex",
        "IDNIXXXD"
    ],

    // 9. The Nature Wall
    [
        "V  a   n",
        "     nV ",
        "N   nAn ",
        "VnVV    ",
        "  n e E ",
        "x   E e ",
        "IDn eeE ",
        "IXD    V"
    ],

    // 10. The Final Fight
    [
        "IXXXXXDA",
        "xe EEVID",
        "x e ee x",
        "nVe   ee",
        "V      V",
        "aaaaaaaa",
        "a  aa  a",
        "aaaaaaaa"
    ],
    
    // TEST MAPS
    
    // 11. Test1
    [
        " x      ",
        "        ",
        "        ",
        "   eEn  ",
        "        ",
        "  aaaa  ",
        "a A  N a",
        "        "
    ],

    // 12. Test2
    [
        " xx     ",
        "        ",
        "        ",
        "   ee   ",
        "        ",
        "  aaaa  ",
        "a A  N a",
        "        "
    ]
];