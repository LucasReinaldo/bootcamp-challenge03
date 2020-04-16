import React, { useState, useEffect } from 'react';

import api from './services/api';

import {
	SafeAreaView,
	View,
	FlatList,
	Text,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

export default function App() {
	const [repository, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then((res) => setRepositories(res.data));
	}, []);

	async function handleLikeRepository(id) {
		const res = await api.post(`/repositories/${id}/like`);

		setRepositories(
			repository.map((repo) => (repo.id === id ? (repo = res.data) : repo))
		);
	}

	return (
		<>
			<StatusBar barStyle="light-content" />
			<SafeAreaView style={styles.container}>
				<FlatList
					data={repository}
					keyExtractor={(repository) => repository.id}
					renderItem={({ item: repository }) => (
						<View style={styles.repositoryContainer}>
							<Text style={styles.repository}>{repository.title}</Text>

							<View style={styles.techsContainer}>
								{repository.techs.map((tech) => (
									<Text key={tech} style={styles.tech}>
										{tech}
									</Text>
								))}
							</View>

							<View style={styles.likesContainer}>
								<Text
									style={styles.likeText}
									// Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
									testID={`repository-likes-${repository.id}`}>
									{repository.likes === 1
										? `${repository.likes} curtida`
										: `${repository.likes} curtidas`}
								</Text>
							</View>

							<TouchableOpacity
								style={styles.button}
								onPress={() => handleLikeRepository(repository.id)}
								// Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
								testID={`like-button-${repository.id}`}>
								<Text style={styles.buttonText}>Curtir</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#B4DFE5',
	},
	repositoryContainer: {
		marginBottom: 15,
		marginHorizontal: 15,
		backgroundColor: '#FEFFFF',
		padding: 20,
	},
	repository: {
		fontSize: 32,
		fontWeight: 'bold',
	},
	techsContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	tech: {
		fontSize: 12,
		fontWeight: 'bold',
		marginRight: 10,
		backgroundColor: '#4D6D9A',
		paddingHorizontal: 10,
		paddingVertical: 5,
		color: '#FFF',
	},
	likesContainer: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	likeText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginRight: 10,
	},
	button: {
		marginTop: 10,
		borderRadius: 6,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginRight: 10,
		color: '#FFF',
		backgroundColor: '#303CBC',
		padding: 15,
	},
});
