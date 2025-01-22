import React from 'react';
import './WalletModal.css';
import { useAddToWalletMutation } from '../../../api/wallet';
import { useGetWalletQuery } from '../../../api/wallet';
interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const [addWallet] = useAddToWalletMutation();
    const { data: wallets, isLoading } = useGetWalletQuery();
    const [amount, setAmount] = React.useState(0);
    const [account, setAccount] = React.useState('');
    const [isCustomAccount, setIsCustomAccount] = React.useState(false);

    if (!isOpen) return null;

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value === 'custom') {
                setIsCustomAccount(true);
                setAccount('');
            } else {
                setIsCustomAccount(false);
                setAccount(e.target.value);
            }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addWallet({ amount, account });
            setAmount(0);
            onClose();
        } catch (err) {
            console.error('Ошибка при пополнении кошелька:', err);
        }
    };

    const handleClose = () => {
        setAmount(0);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Пополнить кошелек</h2>
                    <button className="close-button" onClick={handleClose}>×</button>
                </div>
                
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Сумма</label>
                        <input 
                            className="input" 
                            type="number" 
                            value={amount}
                            onChange={handleChangeAmount}
                            placeholder="Введите сумму" 
                        />
                        <div className="form-group">
                            <label className="label">Кошелек</label>
                            <select 
                                className="input"
                                value={isCustomAccount ? 'custom' : account}
                                onChange={handleChangeAccount}
                                name='account'
                            >
                                <option value="">Выберите кошелек</option>
                                {!isLoading && wallets?.map((wallet, index) => (
                                    <option key={index} value={wallet.account}>{wallet.account}</option>
                                ))}
                                <option value="custom">Добавить новый кошелек</option>
                            </select>
                            
                            {isCustomAccount && (
                                <input 
                                    className="input"
                                    type="text"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    placeholder="Введите номер кошелька"
                                />
                            )}
                        </div>

                    </div>

                    <button className="submit-button" type="submit">OK</button>
                </form>
            </div>
        </div>
    );
};
export default WalletModal;
