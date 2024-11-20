[RFS]

[ADMIN]
________________________________________________________________________

[Requisitos Funcionais]

1. Gestão de Unidades
1.1. O sistema deve permitir o cadastro de novas unidades.
1.2. O sistema deve permitir a listagem de todas as unidades cadastradas.
1.3. O sistema deve permitir a exclusão de unidades específicas.
1.4. O sistema deve permitir buscar informações de uma unidade específica.

2. Gestão de Usuários
2.1. O sistema deve permitir que novos usuários se cadastrem na plataforma.
2.2. O sistema deve permitir a autenticação de usuários.
2.3. O sistema deve permitir receber notificações da condição de cada usuario(Estado de saude ou Tempo de usabilidade)

3. Gestão de Pacientes
3.1. O sistema deve permitir listar todos os pacientes cadastrados.
3.2. O sistema deve permitir buscar informações de um paciente específico.
3.3. O sistema deve permitir filtrar pacientes por doenças específicas (ex.: Diabetes, Hipertensão).
3.4. O sistema deve permitir a remoção de pacientes.

4. Gestão de Técnicos
4.0
4.1. O sistema deve permitir listar todos os técnicos cadastrados na plataforma.
4.2. O sistema deve permitir buscar informações de um técnico específico.

5. Estatísticas e Relatórios
5.1. O sistema deve exibir estatísticas sobre:

Quantos pacientes possuem Diabetes.
Quantos pacientes possuem Hipertensão.
O percentual de pacientes com cada condição.
5.2. O sistema deve apresentar gráficos ilustrativos do número de pacientes com Diabetes e Hipertensão.
5.3 O sistema deve mostrar o percentual num grafico  dos que tem diabete dos que so tem  tem diabete e dos


[TECNICO]

1.1 Deve Observar as informações do paciente
1.2 Deve pesquisar unidade pesquisar unidade
1.3 Deve Cadastrar Pacientes 
1.4 Deve enviar os dados de cada paciente diariamente
1.5 Deve enviar mensagem para a Central

[Regras de Negocios]

1-Nao pode se cadastrar com mesmo NIP
2-Apenas usuários com permissão de administrador podem cadastrar, atualizar ou excluir unidades.
3-Não é permitido excluir uma unidade se houver pacientes ou técnicos vinculados a ela
4-Cada unidade deve ter um nome único no sistema.
5-Técnicos só podem ser associados a unidades existentes no sistema.
