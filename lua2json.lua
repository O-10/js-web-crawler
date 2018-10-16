local JSON = dofile('json.lua')

local i = 1;

for i = 1, 11, 1 do

    print('transforming file', i)
    local input = dofile('2000/bloco_'..i..'.lua');
    local saida = io.open('ceps/bloco_'..i..'.json', 'w+');
    saida:write(JSON.stringify(input));
    saida:close();
    input = nil;


end