import React from 'react';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
// import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import InputBox from './textarea-test';
const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <InputBox />
      </div>
    </div>
  );
};

export default HomePage;
