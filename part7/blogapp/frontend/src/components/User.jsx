import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../requests";

const User = () => {
	const id = useParams().id;
	const {
		data: user,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: () => {
			return getUser(id);
		},
	});
	if (isError) {
		return <>that user does not exist.</>;
	}
	if (isPending) {
		return <>user loading...</>;
	}
	return (
		<>
			username: {user.username}
			<br />
			<h6>all blogs</h6>
			<table>
				<tbody>
					{user.blogs.map((blog) => {
						return (
							<tr key={blog.id}>
								<td>{blog.title}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default User;
