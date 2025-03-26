import { Params } from 'react-router-dom';

import { PAGES } from 'src/constants/navigation';
import { Locales } from 'src/i18n';

export type ID = string;
export type Email = string;

export type ModalMode = 'base' | 'light' | 'inky';

export type Scheme = {
  scheme: PAGES;
  params?: Params;
};

export type IconBaseProps = {
  size?: number;
  fill?: string;
};

export type Task = {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  statusId?: number;
  statusName?: string;
  statusRgb?: string;
  executorId?: number;
  executorName?: string;
  initiatorId?: number;
  initiatorName?: string;
  priority?: {
    id: number;
    name: string;
  };
};

export type User = {
  userId: ID;
  name: string;
  phone: string;
  email: Email;
};

export type GeoInfo = {
  city?: string;
  country?: string;
  locale: Locales;
};

export enum BID_STATUS {
  OPENED = 'Открыта',
  IN_PROGRESS = 'В работе',
  COMPLETED = 'Выполнена',
  REQUIRES_CLARIFICATION = 'Требует уточнения',
  POSTPONED = 'Отложена',
  CLOSED = 'Закрыта',
}

export namespace Actions {
  export namespace api {
    export namespace user {
      export namespace getUser {
        export type started = {
          extra: {
            orderUID: User['userId'];
          };
        };
        export type done = {
          message: 'successfully' | 'something was wrong';
          data: User;
        };
      }
    }
  }

  export namespace ui {
    export namespace geoInfo {
      export type set = {
        info: GeoInfo;
      };
    }

    export namespace loader {
      export type show = void;
      export type hide = void;
    }

    export namespace redirect {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      export type redirectWithoutParams = any;
    }

    export namespace modal {
      export type show<T> = T;
      export type hide = void;
    }
  }
}
