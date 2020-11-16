import React, {useCallback, useEffect, useState} from 'react';

import axios from '../../api';
import {Transactions} from "../../models/transactions";

import styles from './style.module.scss';
import Modal from "../../components/modal";
import {MASKS} from "../../shared/mask";

export const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [transactionDetail, setTransactionDetail] = useState<Transactions>();
    const [transactions, setTransactions] = useState<Transactions[]>();
    const [originalData, setOriginalData] = useState<Transactions[]>();

    const [titleFilter, setTitleFilter] = useState<string>();
    const [statusFilter, setStatusFilter] = useState<string>();

    const getTransactions = async () => {
        let res = await axios.get<Transactions[]>(`transactions`);
        return [...res.data];
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        const data = await getTransactions();
        setOriginalData(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (originalData) {
            setTransactions([...originalData]);
        }
    }, [originalData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const data = originalData?.filter(item => {
            if (!!statusFilter && !titleFilter) {
                return item.status === statusFilter;
            } else if (!!statusFilter && !!titleFilter) {
                return item.status === statusFilter && item.title.toLowerCase().search(titleFilter) >= 0;
            } else if (!statusFilter && !!titleFilter) {
                return item.title.toLowerCase().search(titleFilter) >= 0;
            } else {
                return true;
            }
        });
        setTransactions(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [titleFilter, statusFilter]);

    const openDetail = (transaction: Transactions) => {
        console.log(transaction);
        setTransactionDetail(transaction);
        setIsOpen(true);
    };

    const filterTitle = (event: any) => {
        setTitleFilter(event.target.value?.toLowerCase());
    };

    const filterStatus = (event: any) => {
        setStatusFilter(event.target.value);
    };

    return (
        <div className="container">

            <div className={styles['block-inline']}>
                <label>Pesquisa</label>
                <input type="text" name="title-filter" placeholder="Pesquise pelo título" onKeyUp={filterTitle} data-testid="search-input" />
            </div>

            <div className={styles['block-inline']}>
                <label>Status</label>
                <select onChange={filterStatus} name="status-filter" data-testid="status-input">
                    <option value="">Todos</option>
                    <option value="created">Solicitada</option>
                    <option value="processing">Processando</option>
                    <option value="processed">Concluída</option>
                </select>
            </div>

            <table className={styles['table']} data-testid="table-transactions">
                <thead>
                <tr>
                    <th className={styles['th']} data-testid="th-title">Título</th>
                    <th className={styles['th']} data-testid="th-description">Descrição</th>
                    <th className={styles['th']} data-testid="th-status">Status</th>
                    <th className={styles['th']} data-testid="th-amount">Valor</th>
                </tr>
                </thead>
                <tbody>
                {transactions?.map(transaction => {
                    return (
                        <tr key={transaction.id} className={styles['tr']} onClick={() => openDetail(transaction)}>
                            <td className={styles['td']}>{transaction.title}</td>
                            <td className={styles['td']}>{transaction.description}</td>
                            <td className={styles['td']}>{transaction.status}</td>
                            <td className={styles['td']}>{MASKS.CURRENCY(transaction.amount)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <Modal
                title={transactionDetail?.title}
                onClose={() => setIsOpen(false)}
                show={isOpen}
            >
                <h3>Status</h3>
                <div className={styles['block']} data-testid="transaction-detail-status">{transactionDetail?.status}</div>

                <h3 className={styles['mt']}>Transferido de</h3>
                <div className={styles['block']}>
                    <div className={styles['float-left']} data-testid="transaction-detail-from">{transactionDetail?.from}</div>
                    <div className={styles['float-right']} data-testid="transaction-detail-from-amount">{MASKS.CURRENCY(transactionDetail?.amount)}</div>
                </div>

                <h3 className={styles['mt']}>Para</h3>
                <div className={styles['block']}>
                    <div className={styles['float-left']} data-testid="transaction-detail-to">{transactionDetail?.to}</div>
                    <div className={styles['float-right']} data-testid="transaction-detail-to-amount">{MASKS.CURRENCY(transactionDetail?.amount)}</div>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
