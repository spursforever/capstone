import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateAComment} from "../../store/comment";

const EditCommentForm = ({ onClose, comment }) => {
    const { pinId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const [content, setComment] = useState(comment.content)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const validationErrors = []
        if (!content) {
            validationErrors.push("Please provide a comment")
        } if (content.length > 260) {
            validationErrors.push("You have exceeded maximum character limit")
        }
        setErrors(validationErrors)
    }, [content])

    const commentSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: comment?.id,
            content,
            user_id: sessionUser.id,
            pin_id: pinId
        }
        const editedComment = await dispatch(updateAComment(payload))
        if (editedComment) {
            // history.push(`/api/pins/${pinId}`)
            onClose(false);
        }
    }

    return (
        <div>
            <form onSubmit={commentSubmit}>
                <h2>Edit Comment</h2>
                <ul>{errors.map((error) => (
                    <li className="" key={error}>
                        {error}
                    </li>))}
                </ul>
                <div>
                    <textarea
                        value={content}
                        placeholder="Please provide your insight on this pin"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={errors.length > 0}
                    >Save</button>
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={onClose}>Cancel</button>
                </div>

            </form>
        </div>
    )
}

export default EditCommentForm;