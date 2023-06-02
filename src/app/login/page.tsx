'use client';
import {useForm} from "react-hook-form";

interface FormValues {
    email: string;
    password: string;
}

export default function Login() {

    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm<FormValues>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        reset();
    });

    return (
        <main className={'flex flex-col items-center justify-center gap-10'}>
            <h1 className={'text-center font-light text-5xl'}>Login</h1>
            <form className={'flex flex-col gap-5 w-full max-w-sm'} onSubmit={onSubmit}>
                <div>
                    <label htmlFor="UserEmail" className="block text-sm font-medium text-gray-200">
                        Email
                    </label>

                    <input
                        {...register('email', {
                            required: 'Email is required'
                        })}
                        type="email"
                        id="UserEmail"
                        className="mt-1 h-10 w-full px-2 rounded-md border-2 border-primary-main bg-gray-600 outline-gray-200 focus:border-secondary-main focus:outline-none shadow-sm sm:text-sm"
                    />
                    <span
                        className={`text-sm antialiased font-light text-red-300 ${errors.email || 'hidden'}`}>{errors.email?.message}</span>
                </div>

                <div>
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-200">
                        Password
                    </label>

                    <input
                        {...register('password', {
                            required: 'Password is required'
                        })}
                        type="password"
                        id="Password"
                        className="mt-1 h-10 w-full px-2 rounded-md border-2 border-primary-main bg-gray-600 outline-gray-200 focus:border-secondary-main focus:outline-none shadow-sm sm:text-sm"
                    />
                    <span
                        className={`text-sm antialiased font-light text-red-300 ${errors.password || 'hidden'}`}>{errors.password?.message}</span>
                </div>

                <button type={'submit'} onClick={onSubmit}
                        className={'rounded p-2 dark:bg-primary-main dark:hover:bg-primary-main dark:active:bg-primary-dark'}>Submit
                </button>
                <h2 className={`text-center font-light text-lg ${isSubmitSuccessful || 'hidden'}`}>Login
                    Submitted...</h2>
            </form>
        </main>
    )
}
