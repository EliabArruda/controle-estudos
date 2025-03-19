# Requisitos Funcionais  

## RF01 - Iniciar Sessão de Estudo  
**Descrição:** O usuário deve poder iniciar uma sessão de estudo, informando a disciplina e o assunto.  
**Validações:**  
- O sistema deve validar se a disciplina e o assunto foram preenchidos.  
- O sistema deve exibir uma mensagem de erro se a disciplina ou o assunto estiverem em branco.  
**Feedback:**  
- O sistema deve exibir uma confirmação visual quando a sessão for iniciada com sucesso.  
**Prioridade:** Alta  

## RF02 - Controle de Tempo de Estudo  
**Descrição:** Após iniciar a sessão, o sistema deve iniciar um contador decremental para o tempo de estudo.  
**Validações:**  
- O sistema deve garantir que o tempo de estudo esteja dentro dos limites permitidos (5 a 120 minutos).  
**Feedback:**  
- O sistema deve exibir o tempo restante de estudo em tempo real na interface do usuário.  
- O sistema deve exibir uma notificação visual (ex: barra de progresso) durante o contador de tempo.  
**Comportamentos:**  
- Quando o tempo de estudo expirar, o sistema deve iniciar automaticamente o contador de descanso.  
- O sistema deve exibir uma mensagem informando que o tempo de estudo acabou e o descanso começou.  
**Prioridade:** Alta  

## RF03 - Registro Automático de Sessão  
**Descrição:** Quando o contador de estudo expirar, o sistema deve registrar automaticamente a sessão com as seguintes informações:  
- Disciplina  
- Assunto  
- Tempo de duração  
- Data e hora de início e término  
**Prioridade:** Alta  

## RF04 - Controle de Tempo de Descanso  
**Descrição:** Após o término da sessão de estudo, o sistema deve iniciar um contador decremental para o tempo de descanso.  
**Prioridade:** Média  

## RF05 - Visualizar Histórico de Sessões  
**Descrição:** O usuário deve poder visualizar um histórico de todas as sessões de estudo registradas, com filtros por data, disciplina e assunto.  
**Prioridade:** Média  
