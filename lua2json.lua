dofile('table.lua')
local JSON = dofile('json.lua')

local i = 1;
--[[
for i = 1, 11, 1 do

    print('transforming file', i)
    local input = dofile('2000/bloco_'..i..'.lua');
    local saida = io.open('ceps/bloco_'..i..'.json', 'w+');
    saida:write(JSON.stringify(input));
    saida:close();
    input = nil;
    saida = nil;


end

--]]
--[[
for i = 1, 11, 1 do

    print('transforming back file', i)
    local Input = io.open('ceps/bloco_'..i..'.json', 'r');
    local input = JSON.parse(Input:read("*all"));
    local saida = io.open('cepBack/bloco_'..i..'.lua', 'w+');
    saida:write('return '..table.tostring(input));
    saida:close();
    input = nil;
    Input = nil;
    saida = nil;


end

--]]


--[[
local teste = dofile('cepBack/bloco_1.lua');

for i = 1, #teste, 1 do
    print(teste[i].cep)
end

--]]



---[[
    

print('transforming back file', i)
local Input = io.open('ceps/cepINSS.json', 'r');
local input = JSON.parse(Input:read("*all"));
local saida = io.open('cepBack/cepINSS.lua', 'w+');
saida:write('return '..table.tostring(input));
saida:close();
input = nil;
Input = nil;
saida = nil;


--]]