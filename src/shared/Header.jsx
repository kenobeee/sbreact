import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './Header.scss';

function HeaderComponent() {
    console.log(styles, styles.example);
    return (
        <header>
            <h1 className={styles.example}>
                Hello React
            </h1>
        </header>
    );
}

export const Header = hot(HeaderComponent);