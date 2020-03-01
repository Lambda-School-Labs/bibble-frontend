import React, { useState } from 'react';
import BookIcon from './BookIcon';
import styled from 'styled-components';
import axios from 'axios';

import { Row, Col, Modal, Button, Input, Checkbox } from 'antd';

const Wrapper = styled.div`
	button.newShelf {
		background-color: #d24719;
		border: none;
		border-radius: 4px;
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			margin-right: 4px;
		}
	}
`;

const ShelfModal = props => {
	const [modalConfig, setModalConfig] = useState({
		visible: false,
		ModalText: '',
		confirmLoading: true,
		shelfName: null,
		shelfPrivate: null
	});

	const showModal = () => {
		setModalConfig({
			...modalConfig,
			visible: true
		});
	};

	const handleChange = e => {
		setModalConfig({
			...modalConfig,
			shelfName: e.target.value
		});
	};

	const handleCheck = e => {
		setModalConfig({
			...modalConfig,
			shelfPrivate: e.target.checked
		});
	};

	const handleOk = () => {
		const userId = localStorage.getItem('id');
		axios
			.post(`http://localhost:5000/api/shelves/${userId}`, {
				shelfName: modalConfig.shelfName,
				isPrivate: modalConfig.shelfPrivate
			})
			.then(res => {
				setModalConfig({
					...modalConfig,
					visible: false,
					confirmLoading: false,
					shelfName: null,
					shelfPrivate: false
				});
			});
	};

	const handleCancel = () => {
		setModalConfig({
			...modalConfig,
			visible: false,
			confirmLoading: false,
			shelfName: null,
			shelfPrivate: false
		});
	};

	return (
		<Wrapper>
			<Row type="flex" justify="center">
				<Col span={props.btnSpan || 22}>
					<Button
						className={props.classname || 'newShelf'}
						onClick={showModal}
						type={props.type || 'primary'}
						size={props.size || 'large'}
						icon={props.icon || ''}
						bgColor={props.bgColor || '#d24719'}
						block
					>
						{!props.icon && (
							<BookIcon
								height="16px"
								width="16px"
								fill="#E5E5E6"
							/>
						)}
						{props.label || 'Create new shelf'}
					</Button>
				</Col>
			</Row>

			<Modal
				title="Create new Shelf"
				visible={modalConfig.visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Input
					size="large"
					placeholder="New shelf name"
					value={modalConfig.shelfName}
					onChange={handleChange}
				/>
				<Checkbox
					checked={modalConfig.shelfPrivate}
					onChange={handleCheck}
				>
					{' '}
					Keep private
				</Checkbox>
			</Modal>
		</Wrapper>
	);
};

export default ShelfModal;

// Use tag below as an example where you want a button added
{
	/* <NewShelfModal block="true" bgColor="red" btnSpan="12" type="default" size="small" label="Click Me!" classname="first" icon="null" /> */
}