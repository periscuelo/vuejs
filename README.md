# VueJs - Javascript - Quick Start

Acho que ter apenas um arquivo utilizando VueJs 2.x com algumas linhas já fala por si só =)

A pasta exemplos ECMA5 contem exemplos do VueJs sendo utilizado com js puro, sem transpilar.
São 3 códigos diferentes e o ultimo deles usa Vuex para controlar dados entre os compontes.
Está bem simples para quem deseja usar Vue sem webpack.

O Vue2 não suporta URL Templates, ou seja, não possui um v-include para carregar templates.
A razão é bem simples. Cada include seria equivalente a uma requisição ajax. Imagine dezenas
de componentes em seu sistema cada um com um template via v-include. Agora faça isso vezes
a quantidade de acessos ao sistema e você teria um problemão.

Mas, pensando nisso, usei javascript com html para carregar um unico arquivo de templates
x-template (do vue), sem ajax, de forma que todos os templates necessários possam ser carregados
ao inicializar a aplicação.

Caso não goste da solução, só lhe restará o webpack ou browserify. Neste caso usar o Single File
Component do Vue será excelente. O Importante é saber que você tem opções e não é obrigado a nada
com o Vue.

Vale a pena experimentar o Vue2 =)

Demos com CDN usando ECMA5:

+ [Hello World](https://periscuelo.github.io/vuejs)
+ [Relógio](https://periscuelo.github.io/vuejs/relogio/)
+ [Cronômetro](https://periscuelo.github.io/vuejs/cronometro/)
+ [Jogo da Velha](https://periscuelo.github.io/vuejs/tictactoe/)
