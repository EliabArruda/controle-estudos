# Regras de Negócio  

## RN01 - Duração Mínima e Máxima de Sessão  
**Descrição:**  
- A sessão de estudo deve ter uma duração mínima de 5 minutos e máxima de 120 minutos.  
- O tempo de descanso deve ter uma duração mínima de 5 minutos e máxima de 30 minutos.  
**Validações:**  
- O sistema deve validar se o tempo de estudo ou descanso está dentro dos limites permitidos.  
- O sistema deve exibir uma mensagem de erro se o tempo estiver fora dos limites.  

## RN02 - Registro Automático  
**Descrição:**  
- O sistema deve registrar automaticamente a sessão de estudo quando o contador de tempo expirar.  
- O registro deve incluir: disciplina, assunto, tempo de duração, data e hora de início e término.  

## RN03 - Bloqueio Durante Sessão  
**Descrição:**  
- Durante uma sessão de estudo ou descanso, o usuário não pode iniciar uma nova sessão até que o tempo atual expire.  
