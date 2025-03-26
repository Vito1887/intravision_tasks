import { Applications } from 'src/components/atoms/icons/iteractions/Applications';
import { Assets } from 'src/components/atoms/icons/iteractions/Assets';
import { Clients } from 'src/components/atoms/icons/iteractions/Clients';
import { Employees } from 'src/components/atoms/icons/iteractions/Employees';
import { KnowledgeBase } from 'src/components/atoms/icons/iteractions/KnowledgeBase';
import { Settings } from 'src/components/atoms/icons/iteractions/Settings';

export const MENU_ITEMS = [
  { id: 1, name: 'База знаний', icon: <KnowledgeBase /> },
  { id: 2, name: 'Заявки', icon: <Applications /> },
  { id: 3, name: 'Сотрудники', icon: <Employees /> },
  { id: 4, name: 'Клиенты', icon: <Clients /> },
  { id: 5, name: 'Активы', icon: <Assets /> },
  { id: 6, name: 'Настройки', icon: <Settings /> },
];
