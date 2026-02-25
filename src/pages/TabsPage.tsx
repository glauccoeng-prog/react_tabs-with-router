// Link: navegação sem recarregar a página (diferente de <a href>)
// useParams: hook que extrai parâmetros dinâmicos da URL (ex: :tabId)
import { Link, useParams } from 'react-router-dom';
import { Tab } from '../types/Tab';

// Lista de abas disponíveis — cada uma com id único, título e conteúdo
const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

export const TabsPage = () => {
  // Extrai o tabId da URL (ex: /tabs/tab-2 → tabId = "tab-2")
  // Se a rota for apenas /tabs (sem parâmetro), tabId será undefined
  const { tabId } = useParams();

  // Busca a aba correspondente ao tabId da URL
  // Se não encontrar (tabId inválido ou ausente), selectedTab será undefined
  const selectedTab = tabs.find(tab => tab.id === tabId);

  return (
    <>
      <h1 className="title">Tabs page</h1>

      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              data-cy="Tab"
              // Adiciona 'is-active' no <li> (não no Link) quando a aba está selecionada
              // Usamos Link em vez de NavLink porque a classe ativa vai no pai (<li>)
              className={tab.id === tabId ? 'is-active' : ''}
            >
              {/* Link atualiza a URL para /tabs/{id} sem recarregar a página */}
              <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mostra o conteúdo da aba selecionada, ou mensagem padrão se nenhuma aba está ativa */}
      <div className="block" data-cy="TabContent">
        {selectedTab ? selectedTab.content : 'Please select a tab'}
      </div>
    </>
  );
};
